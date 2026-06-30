export type PreviewType = "iframe" | "terminal" | "notebook";

export interface Project {
  id: number;
  title: string;
  year: string;
  type: string;
  status: "Live" | "In Development" | "Completed";
  shortDescription: string;
  description: string;
  tech: string[];
  preview: {
    type: PreviewType;
    url?: string;
    file?: string;
  };
  images: string; // Base folder path
  imageFiles?: string[]; // Optional specific file names
  links: {
    site?: string;
    github?: string;
  };
}
