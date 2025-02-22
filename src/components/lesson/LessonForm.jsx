import { useGeminiApi } from "@/hooks/useGeminiApi";
import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LessonForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    gradeLevel: "",
    mainConcept: "",
    subtopics: [""],
    materialsNeeded: [""],
    learningObjectives: [""],
  });

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const { generateLessonPlan, loading, error } = useGeminiApi();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      const newArray = [...formData[field]];
      newArray.splice(index, 1);
      setFormData((prev) => ({ ...prev, [field]: newArray }));
    }
  };

  const handleGeneratePlan = async () => {
    // Filter out empty values
    const cleanedData = {
      ...formData,
      subtopics: formData.subtopics.filter((item) => item.trim() !== ""),
      materialsNeeded: formData.materialsNeeded.filter((item) => item.trim() !== ""),
      learningObjectives: formData.learningObjectives.filter((item) => item.trim() !== ""),
    };

    const plan = await generateLessonPlan(cleanedData);
    console.log("plan", plan);
    if (plan) {
      setGeneratedPlan(plan);
      // Save to localStorage for persistence
      localStorage.setItem("lessonPlan", JSON.stringify(plan));
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Lesson Plan Creator</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Topic</label>
                <Input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="e.g., Gravitation" />
              </div>
              <div>
                <label className="block mb-2">Grade Level</label>
                <Input name="gradeLevel" value={formData.gradeLevel} onChange={handleInputChange} placeholder="e.g., 9th Grade" />
              </div>
            </div>

            <div>
              <label className="block mb-2">Main Concept</label>
              <Textarea name="mainConcept" value={formData.mainConcept} onChange={handleInputChange} placeholder="e.g., Newton's Law of Universal Gravitation" rows={2} />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="subtopics">
                <AccordionTrigger>Subtopics</AccordionTrigger>
                <AccordionContent>
                  {formData.subtopics.map((item, index) => (
                    <div key={`subtopic-${index}`} className="flex gap-2 mb-2">
                      <Input value={item} onChange={(e) => handleArrayInputChange(e, index, "subtopics")} placeholder={`Subtopic ${index + 1}`} />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem(index, "subtopics")}>
                        -
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addArrayItem("subtopics")} className="mt-2">
                    Add Subtopic
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="materials">
                <AccordionTrigger>Materials Needed</AccordionTrigger>
                <AccordionContent>
                  {formData.materialsNeeded.map((item, index) => (
                    <div key={`material-${index}`} className="flex gap-2 mb-2">
                      <Input value={item} onChange={(e) => handleArrayInputChange(e, index, "materialsNeeded")} placeholder={`Material ${index + 1}`} />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem(index, "materialsNeeded")}>
                        -
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addArrayItem("materialsNeeded")} className="mt-2">
                    Add Material
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="objectives">
                <AccordionTrigger>Learning Objectives</AccordionTrigger>
                <AccordionContent>
                  {formData.learningObjectives.map((item, index) => (
                    <div key={`objective-${index}`} className="flex gap-2 mb-2">
                      <Input value={item} onChange={(e) => handleArrayInputChange(e, index, "learningObjectives")} placeholder={`Learning Objective ${index + 1}`} />
                      <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem(index, "learningObjectives")}>
                        -
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => addArrayItem("learningObjectives")} className="mt-2">
                    Add Learning Objective
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button type="button" onClick={handleGeneratePlan} disabled={loading || !formData.topic || !formData.gradeLevel || !formData.mainConcept} className="w-full">
              {loading ? "Generating..." : "Generate Lesson Plan"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}
          </form>

          {loading && (
            <div className="mt-8 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}

          {/* {generatedPlan && !loading && (
            <LessonPreview lessonPlan={generatedPlan} />
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonForm;
