import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { ProductData, productSchema } from "@/utils/schema";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "email",
  });

  async function onSubmit(data: ProductData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(Number(data.price)));
    formData.append("description", data.description || "");
    formData.append("stock", String(Number(data.stock)));
    formData.append("category", data.category);
    data.email.forEach((email: any) => formData.append("email", email));
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    // ngirim ke admin product
    try {
      const response = await axios.post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMjc0NzA3LCJleHAiOjE3MzAyNzgzMDd9.ZfzZFnN46Q7-d7w8V2Ko7IxAVRN23ljzTaUcyrTkV5I`,
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

        {/* komponen untuk input name produk*/}
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

        {/* komponen untuk input price produk*/}
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

        {/* komponen untuk input description produk*/}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            {...register("description")}
            className={`w-full p-2 border border-gray-300 rounded`}
          />
        </div>

        {/* komponen untuk input stock produk*/}
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

        {/* komponen untuk input category produk*/}
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

        {/* komponen untuk dynamic input email user*/}
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          {/* mapping komponen input sesuai keinginan admin akan memberikan pemberitahuan ke siapa saja*/}
          {fields?.map((field: any, index: any) => (
            <div key={field.id} className="flex items-center mb-2">
              {/* komponen input untuk menambahkan field input email user*/}
              <input
                type="text"
                {...register(`email.${index}`)}
                className={`flex-1 p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />

              {/* komponen button untuk remove field input email user*/}
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
              {errors.email && errors.email[index] && (
                <p className="text-red-500">{errors.email[index]?.message}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append("")}
            className="mt-2 text-blue-500"
          >
            Add Email
          </button>
        </div>

        {/* komponen untuk input image produk */}
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

        {/* button untuk submit */}
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
