import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, Save, X } from "lucide-react";

interface Question {
  id: string;
  survey_id: string;
  question_text: string;
  question_type: string;
  options: any;
  order_index: number;
  required: boolean;
}

interface QuestionManagerProps {
  surveyId: string;
  onClose: () => void;
}

const QuestionManager = ({ surveyId, onClose }: QuestionManagerProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    question_text: "",
    question_type: "text",
    options: null as any,
    required: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, [surveyId]);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('survey_id', surveyId)
      .order('order_index', { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching questions",
        description: error.message,
      });
    } else {
      setQuestions(data || []);
    }
  };

  const resetForm = () => {
    setFormData({
      question_text: "",
      question_type: "text",
      options: null,
      required: true
    });
    setEditingQuestion(null);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question_text: question.question_text,
      question_type: question.question_type,
      options: question.options,
      required: question.required
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questionData = {
      ...formData,
      survey_id: surveyId,
      order_index: editingQuestion ? editingQuestion.order_index : questions.length
    };

    if (editingQuestion) {
      const { error } = await supabase
        .from('questions')
        .update(questionData)
        .eq('id', editingQuestion.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating question",
          description: error.message,
        });
      } else {
        toast({
          title: "Question updated",
          description: "The question has been updated successfully.",
        });
        fetchQuestions();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('questions')
        .insert([questionData]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error creating question",
          description: error.message,
        });
      } else {
        toast({
          title: "Question created",
          description: "The question has been created successfully.",
        });
        fetchQuestions();
        resetForm();
      }
    }
  };

  const handleDelete = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) {
      return;
    }

    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', questionId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting question",
        description: error.message,
      });
    } else {
      toast({
        title: "Question deleted",
        description: "The question has been deleted successfully.",
      });
      fetchQuestions();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question_text">Question Text *</Label>
              <Textarea
                id="question_text"
                value={formData.question_text}
                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                required
                placeholder="Enter your question"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question_type">Question Type</Label>
              <Select
                value={formData.question_type}
                onValueChange={(value) => setFormData({ ...formData, question_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="rating">Rating (1-5)</SelectItem>
                  <SelectItem value="yes_no">Yes/No</SelectItem>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.question_type === 'multiple_choice' && (
              <div className="space-y-2">
                <Label htmlFor="options">Options (comma-separated)</Label>
                <Input
                  id="options"
                  value={formData.options ? formData.options.join(', ') : ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                  })}
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
              />
              <Label htmlFor="required">Required</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingQuestion ? "Update" : "Add"} Question
              </Button>
              {editingQuestion && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="font-semibold">Questions ({questions.length})</h3>
        {questions.map((question, index) => (
          <Card key={question.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">
                        {index + 1}. {question.question_text}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Type: {question.question_type}
                        {question.options && ` • Options: ${question.options.join(', ')}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(question.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {questions.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No questions yet. Add your first question above.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
