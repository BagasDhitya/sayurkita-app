import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { ProductData, productSchema } from "@/utils/schema";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
  });
  const [emails, setEmails] = useState<string[]>([""]);

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  async function onSubmit(data: ProductData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(Number(data.price)));
    formData.append("description", data.description || "");
    formData.append("stock", String(Number(data.stock)));
    formData.append("category", data.category);

    emails.forEach((email) => formData.append("email", email));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer YOUR_TOKEN_HERE`,
        },
      });
      console.log("success : ", response.data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="w-screen h-full bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-lg text-black"
      >
        <h2 className="font-semibold flex justify-center my-5">
          Create Product
        </h2>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full p-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className={`w-full p-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            {...register("description")}
            className={`w-full p-2 border border-gray-300 rounded`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            {...register("stock")}
            className={`w-full p-2 border ${
              errors.stock ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.stock && (
            <p className="text-red-500">{errors.stock?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Sayuran Hijau">Sayuran Hijau</option>
            <option value="Umbi umbian">Umbi umbian</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          {emails.map((email, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className={`flex-1 p-2 border ${
                  errors.email?.[index] ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => handleRemoveEmail(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
              {errors.email?.[index] && (
                <p className="text-red-500">{errors.email[index]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEmail}
            className="mt-2 text-blue-500"
          >
            Add Email
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setValue("image", e.target.files[0]);
              }
            }}
            className={`w-full p-2 border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
