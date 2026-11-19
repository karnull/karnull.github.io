import catalog from "../../public/terminal.d/data/codebase.list?raw";

export type Grade = "projects" | "scripts" | "templates" | "contributions";

export interface CodePost {
  heading: string;
  description: string;
  tags: string[];
  link: string;
  year: number;
  grade: Grade;
}

const parseRow = (line: string): CodePost => {
  const [heading, grade, year, link, tags, description] = line
    .split("|")
    .map((field) => field.trim());

  return {
    heading,
    grade: grade as Grade,
    year: Number(year),
    link,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    description,
  };
};

export const codebasePosts: CodePost[] = catalog
  .split("\n")
  .filter((line) => line.trim() !== "" && !line.trimStart().startsWith("#"))
  .map(parseRow);
