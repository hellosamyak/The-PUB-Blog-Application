import { useCallback, useEffect } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService, {
    type BlogPostRow,
    type PostData,
    type PostUpdate,
} from "../../appwrite/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface PostFormData {
    title: string;
    content: string;
    status: string;
    slug: string;
    image?: FileList;
}

interface PostFormProps {
    post?: BlogPostRow;
}

function PostForm({ post }: PostFormProps) {
    const { register, handleSubmit, setValue, control, getValues } =
        useForm<PostFormData>({
            defaultValues: {
                title: post?.title || "",
                content: post?.content || "",
                status: post?.status || "active",
                slug: post?.slug || "",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth.userData);
    const title = useWatch({ control, name: "title" });

    const submit: SubmitHandler<PostFormData> = async (data) => {
        const file = data.image?.[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;

        if (file && post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
        }

        const featuredImage = file ? file.$id : post?.featuredImage;

        if (post) {
            const updateData: PostUpdate = {
                title: data.title,
                content: data.content,
                status: data.status,
                featuredImage,
            };
            const dbPost = await appwriteService.updatePost(post.$id, updateData);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // console.log("Submitting with userId:", userData?.$id);
            const createData: PostData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredImage,
                userId: userData.$id,
            };
            const dbPost = await appwriteService.createPost(createData);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value: string) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .replace(/-+/g, "_")

        return "";
    }, []);

    useEffect(() => {
        setValue("slug", slugTransform(title || ""), { shouldValidate: true });
    }, [slugTransform, title, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
            <div className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="mb-4 w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            width={800}
                            height={533}
                            loading="lazy"
                            decoding="async"
                            className="w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-emerald-600" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
