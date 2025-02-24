import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const LessonPreview = ({ lessonPlan }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Lesson Plan - ${lessonPlan.topic}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  // Format today's date
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

  return (
    <div className="mt-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generated Lesson Plan</CardTitle>
          <Button onClick={handlePrint}>Download as PDF</Button>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md " ref={componentRef}>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-center mb-6">Lesson Plan: {lessonPlan.topic}</h1>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p>
                    <strong>Date:</strong> {formattedDate}
                  </p>
                  <p>
                    <strong>Subject:</strong> {lessonPlan.topic}
                  </p>
                  <p>
                    <strong>Grade Level:</strong> {lessonPlan.gradeLevel}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Main Topic:</strong> {lessonPlan.mainConcept}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Subtopics</h2>
                <ul className="list-disc pl-5">
                  {lessonPlan.subtopics.map((subtopic, index) => (
                    <li key={index}>{subtopic}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Materials Needed</h2>
                <ul className="list-disc pl-5">
                  {lessonPlan.materialsNeeded.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
                <ul className="list-disc pl-5">
                  {lessonPlan.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Lesson Outline</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Duration</TableHead>
                      <TableHead className="w-46">Activity</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lessonPlan.lessonOutline.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>{item.activity}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Assessment/Evaluation</h2>
                <ul className="list-disc pl-5">
                  {lessonPlan.assessmentQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Notes</h2>
                <div className="p-4 border rounded min-h-24">{/* Empty space for notes */}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPreview;
