import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconInfoCircle } from "@tabler/icons-react";

export default function FileFormat() {
  return (
    <div className="mx-auto max-w-3xl w-full flex flex-col gap-8 mt-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          File Format Guide
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn how to properly format your `.txt` files to easily import
          quizzes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconInfoCircle className="text-blue-500" />
            General Rules
          </CardTitle>
          <CardDescription>
            The parser reads your file line by line. Follow these simple steps:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm md:text-base">
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Question description:</strong>{" "}
              Write the content of your question first. It can span multiple
              lines.
            </li>
            <li>
              <strong className="text-foreground">Answers:</strong> Write each
              answer on a new line immediately after the question.
            </li>
            <li>
              <strong className="text-foreground">Correct answers:</strong> You
              MUST mark correct answers by starting the line with{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">
                {">>>"}
              </code>
              .
            </li>
            <li>
              <strong className="text-foreground">Prefixes (Optional):</strong>{" "}
              Answer lines can start with letters like <code>A)</code>,{" "}
              <code>B.</code>, etc. The parser will automatically ignore them.
              If there is no answers prefixes, end of answers to one question
              must end with an empty line before writing another question.
            </li>
            <li>
              <strong className="text-foreground">Multiple questions:</strong>{" "}
              Separate questions simply by providing answers to the previous
              one, then typing a new question description.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Single Choice Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 dark:bg-black border rounded-md p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-zinc-300">
                <code>
                  <span className="text-blue-400">
                    Where was Alan Turing born?
                  </span>
                  {"\n"}
                  A) Manchester{"\n"}
                  B) Paris{"\n"}
                  <span className="text-green-400 font-bold">
                    {">>>"}C) London
                  </span>
                  {"\n"}
                  D) Glasgow
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              2. Multiple Choice Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 dark:bg-black border rounded-md p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-zinc-300">
                <code>
                  <span className="text-blue-400">
                    Which of the following are planets?{"\n"}(Select all that
                    apply)
                  </span>
                  {"\n"}
                  <span className="text-green-400 font-bold">
                    {">>>"} Earth
                  </span>
                  {"\n"}
                  Sun{"\n"}
                  <span className="text-green-400 font-bold">{">>>"} Mars</span>
                  {"\n"}
                  Moon
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
