import { getPostById } from "@/db";
import { BlogComposeForm } from "@/app/components/BlogComposeForm";
import { ComposeBlogLayout } from "@/app/components/ComposeBlogLayout";

type ComposeBlogEditPageProps = {
  params: { id: string };
};

export async function ComposeBlogEditPage({ params }: ComposeBlogEditPageProps) {
  const postId = Number.parseInt(params.id, 10);
  if (!Number.isInteger(postId) || postId < 1) {
    return (
      <ComposeBlogLayout title="Invalid post" backToList>
        <p>This post link is not valid.</p>
      </ComposeBlogLayout>
    );
  }

  const post = await getPostById(postId);
  if (!post) {
    return (
      <ComposeBlogLayout title="Post not found" backToList>
        <p>That post may have been deleted.</p>
      </ComposeBlogLayout>
    );
  }

  return (
    <ComposeBlogLayout title="Edit post" backToList>
      <BlogComposeForm
        mode="edit"
        postId={post.id}
        initialTitle={post.title}
        initialSlug={post.slug}
        initialExcerpt={post.excerpt}
        initialBodyMd={post.body_md}
        initialPublished={post.published === 1}
      />
    </ComposeBlogLayout>
  );
}
