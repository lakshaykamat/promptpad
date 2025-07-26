import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/";
import { EnhancePromptApiResponse } from "@/lib";



function Output({ data }: { data: EnhancePromptApiResponse }) {
  return (
    <div className="space-y-6 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded whitespace-pre-wrap">
            {data.final_prompt}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
export default Output