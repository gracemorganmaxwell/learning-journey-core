import { BlogComposeForm } from "@/app/components/BlogComposeForm";
import { ComposeBlogLayout } from "@/app/components/ComposeBlogLayout";

export function ComposeBlogNewPage() {
  return (
    <ComposeBlogLayout title="New post" backToList>
      <BlogComposeForm mode="create" />
    </ComposeBlogLayout>
  );
}
