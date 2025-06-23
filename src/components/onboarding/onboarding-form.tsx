"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle } from "lucide-react";
import PersonalInfoForm from "./personal-info-form";
import PersonalDetailForm from "./personal-detail-form";
import ProfileUpload from "./profile-upload";
import { saveArtistToCSV } from "@/app/actions/save-csv";

// Data Arrays
const categories: string[] = [
  "Singer",
  "Dancer",
  "Speaker",
  "DJ",
  "Comedian",
  "Instrumentalist",
  "Choreographer",
  "Music Producer",
  "Performer",
];

const languages: string[] = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
];

const feeRanges: string[] = [
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹30,000",
  "₹30,000 - ₹50,000",
  "₹50,000 - ₹100,000",
  "₹100,000+",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
// Zod Schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Location is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  email: z.string().email("Valid email is required"),
  experience: z.string().regex(/^\d+$/, "Experience must be a number in years"),
  portfolio: z.string().url().optional().or(z.literal("")),
  profileImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function OnboardingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [steps, setSteps] = useState(1);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
      phone: "",
      email: "",
      experience: "",
      portfolio: "",
      profileImage: undefined,
    },
  });

  // Step-wise field validation map
  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["name", "bio", "location", "phone", "email"],
    2: ["categories", "languages", "feeRange", "experience", "portfolio"],
    3: ["profileImage"],
  };

  const validateStep = async (): Promise<boolean> => {
    const fieldsToValidate = stepFields[steps];
    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result: any = await saveArtistToCSV(data);
      setDownloadLink(result.filePath);
    } catch (err) {
      console.error("CSV save failed:", err);
    }
    console.log("Artist Registration Data:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining Artistly! Our team will review your
            application and get back to you within 24-48 hours.
          </p>
          {downloadLink && (
            <a
              href={downloadLink}
              download
              className="text-blue-600 underline block mb-4"
            >
              Download Submission CSV
            </a>
          )}

          <Button onClick={() => (window.location.href = "/")}>
            Return to Homepage
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-[5vw] my-4"
        >
          {/* Step Components */}
          {steps === 1 && <PersonalInfoForm form={form} />}
          {steps === 2 && (
            <PersonalDetailForm
              form={form}
              categories={categories}
              feeRanges={feeRanges}
              languages={languages}
            />
          )}
          {steps === 3 && <ProfileUpload form={form} />}

          {/* Navigation Buttons */}
          <div
            className={`flex ${steps > 1 ? "justify-between" : "justify-end"}`}
          >
            {steps > 1 && (
              <Button
                type="button"
                onClick={() => setSteps((prev) => Math.max(prev - 1, 1))}
              >
                Prev Step
              </Button>
            )}

            <Button
              type="button"
              onClick={async () => {
                if (steps < 3) {
                  const valid = await validateStep();
                  if (valid) {
                    setSteps((prev) => prev + 1);
                  }
                } else {
                  form.handleSubmit(onSubmit)();
                }
              }}
              disabled={isSubmitting}
            >
              {steps < 3
                ? `Go to Step ${steps + 1}`
                : isSubmitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
