import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar,
  TrendingUp,
  LogOut,
  Settings,
  Bell,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth) {
      const parsed = JSON.parse(auth);
      if (parsed.isAuthenticated) {
        setIsAuthenticated(true);
        return;
      }
    }
    navigate("/admin-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">NextStudents</span>
            </div>
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Students"
            value="1,234"
            description="+12% from last month"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
          <StatsCard
            title="Active Courses"
            value="45"
            description="8 new this semester"
            icon={<BookOpen className="h-5 w-5 text-primary" />}
          />
          <StatsCard
            title="Attendance Rate"
            value="94.2%"
            description="+2.1% from last week"
            icon={<Calendar className="h-5 w-5 text-primary" />}
          />
          <StatsCard
            title="Grade Average"
            value="B+"
            description="Improved by 0.3 GPA"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Manage Students
              </CardTitle>
              <CardDescription>Add, edit, or remove student records</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Management
              </CardTitle>
              <CardDescription>Manage courses and assignments</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Attendance Tracking
              </CardTitle>
              <CardDescription>View and manage attendance records</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="New student enrolled"
                description="John Doe was added to Computer Science"
                time="2 hours ago"
              />
              <ActivityItem
                title="Course updated"
                description="Mathematics 101 schedule changed"
                time="4 hours ago"
              />
              <ActivityItem
                title="Attendance marked"
                description="Physics class attendance recorded"
                time="5 hours ago"
              />
              <ActivityItem
                title="Grade submitted"
                description="Final grades for English Literature posted"
                time="1 day ago"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ActivityItem = ({ 
  title, 
  description, 
  time 
}: { 
  title: string; 
  description: string; 
  time: string;
}) => (
  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
    <div className="flex-1">
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
  </div>
);

export default Dashboard;
