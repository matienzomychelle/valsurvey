import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuestionManager from "./QuestionManager";

interface Survey {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const SurveyManagement = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active"
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching surveys",
        description: error.message,
      });
    } else {
      setSurveys(data || []);
    }
  };

  const handleOpenDialog = (survey?: Survey) => {
    if (survey) {
      setEditingSurvey(survey);
      setFormData({
        title: survey.title,
        description: survey.description || "",
        status: survey.status
      });
    } else {
      setEditingSurvey(null);
      setFormData({
        title: "",
        description: "",
        status: "active"
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSurvey(null);
    setFormData({
      title: "",
      description: "",
      status: "active"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSurvey) {
      const { error } = await supabase
        .from('surveys')
        .update(formData)
        .eq('id', editingSurvey.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating survey",
          description: error.message,
        });
      } else {
        toast({
          title: "Survey updated",
          description: "The survey has been updated successfully.",
        });
        fetchSurveys();
        handleCloseDialog();
      }
    } else {
      const { error } = await supabase
        .from('surveys')
        .insert([formData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating survey",
          description: error.message,
        });
      } else {
        toast({
          title: "Survey created",
          description: "The survey has been created successfully.",
        });
        fetchSurveys();
        handleCloseDialog();
      }
    }
  };

  const handleToggleStatus = async (survey: Survey) => {
    const newStatus = survey.status === 'active' ? 'inactive' : 'active';
    
    const { error } = await supabase
      .from('surveys')
      .update({ status: newStatus })
      .eq('id', survey.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating survey status",
        description: error.message,
      });
    } else {
      toast({
        title: "Status updated",
        description: `Survey is now ${newStatus}.`,
      });
      fetchSurveys();
    }
  };

  const handleDelete = async (surveyId: string) => {
    if (!confirm("Are you sure you want to delete this survey? This will also delete all associated questions.")) {
      return;
    }

    const { error } = await supabase
      .from('surveys')
      .delete()
      .eq('id', surveyId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting survey",
        description: error.message,
      });
    } else {
      toast({
        title: "Survey deleted",
        description: "The survey has been deleted successfully.",
      });
      fetchSurveys();
    }
  };

  const handleManageQuestions = (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setIsQuestionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Survey Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage surveys</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Create Survey
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{survey.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {survey.description || "No description"}
                  </CardDescription>
                </div>
                <Badge variant={survey.status === 'active' ? 'default' : 'secondary'}>
                  {survey.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleManageQuestions(survey.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Questions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(survey)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(survey)}
                >
                  <Switch checked={survey.status === 'active'} />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(survey.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Created: {new Date(survey.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {surveys.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No surveys yet. Create your first survey to get started.</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSurvey ? "Edit Survey" : "Create New Survey"}</DialogTitle>
            <DialogDescription>
              {editingSurvey ? "Update survey details" : "Create a new survey with title and description"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter survey title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter survey description"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingSurvey ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Questions</DialogTitle>
            <DialogDescription>
              Add, edit, and organize questions for this survey
            </DialogDescription>
          </DialogHeader>
          {selectedSurveyId && (
            <QuestionManager
              surveyId={selectedSurveyId}
              onClose={() => setIsQuestionDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SurveyManagement;
