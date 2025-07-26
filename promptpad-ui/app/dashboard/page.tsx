'use client';

import { useState } from "react";
import {
  Button,
  Textarea,
  Label,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from "@/components/index";
import { EnhancePromptApiResponse, getEnhancedPrompt } from "@/lib";
import Output from "./components/Output";

function DashboardPage() {
  const [input, setInput] = useState(
   ""
  );
  const [output, setOutput] = useState<EnhancePromptApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await getEnhancedPrompt(input);
      setOutput(response);
    } catch (error) {
      setOutput(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Dashboard Page</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-input">Your Prompt</Label>
            <Textarea
              id="user-input"
              placeholder="Enter your prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>

      {!loading && output && <Output data={output} />}
    </div>
  );
}

export default DashboardPage;
