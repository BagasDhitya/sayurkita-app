import { Request, Response } from "express";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";
import { EmailService } from "../services/email.service";

jest.mock("../services/admin.service");
jest.mock("../services/email.service");

describe("AdminController", () => {
  let adminController: AdminController;
  let adminService: jest.Mocked<AdminService>;
  let emailService: jest.Mocked<EmailService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock = jest.fn();

  beforeEach(() => {
    adminService = new AdminService() as jest.Mocked<AdminService>;
    emailService = new EmailService() as jest.Mocked<EmailService>;

    adminController = new AdminController();
    adminController["adminService"] = adminService;
    adminController["emailService"] = emailService;

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a product and send an email notification with a file image", async () => {
    const productData: any = {
      name: "Sample Product",
      category: "Sayuran Hijau",
      price: 100,
      description: "Testing product description",
      image: "uploads/sample.jpg",
      stock: 10,
    };

    mockRequest.body = {
      ...productData,
      email: "bagas@example.com",
    };

    // Mock the file upload
    mockRequest.file = {
      path: "uploads/sample.jpg",
      mimetype: "image/jpeg",
      filename: "sample.jpg",
    } as Express.Multer.File;

    adminService.createProduct.mockResolvedValue(productData);
    emailService.sendEmail.mockResolvedValue(true);

    await adminController.createProduct(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(adminService.createProduct).toHaveBeenCalledWith({
      ...productData,
      image: "uploads/sample.jpg",
    });
    expect(emailService.sendEmail).toHaveBeenCalledWith(
      "bagas@example.com",
      productData
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Product created successfully",
      status: 201,
    });
  });

  it("should return all products", async () => {
    const products: any = [
      {
        name: "Product A",
        price: 50,
        stock: 20,
        category: "A",
        image: "",
        description: "",
      },
    ];

    adminService.getProducts.mockResolvedValue(products);

    await adminController.getProducts(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      data: products,
      status: 200,
    });
  });

  it("should return a product by ID", async () => {
    const product: any = {
      name: "Product B",
      price: 70,
      stock: 15,
      category: "B",
      image: "",
      description: "",
    };

    mockRequest.params = { id: "1" };
    adminService.getProductById.mockResolvedValue(product);

    await adminController.getProductById(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: `Product 1 was successfully retrieved`,
      status: 201,
      data: product,
    });
  });

  it("should update a product", async () => {
    const updatedProduct: any = {
      name: "Updated Product",
      price: 80,
      stock: 10,
      category: "A",
      image: "",
      description: "",
    };

    mockRequest.params = { id: "1" };
    mockRequest.body = updatedProduct;
    adminService.updateProduct.mockResolvedValue(updatedProduct);

    await adminController.updateProduct(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Update product successfully",
      status: 201,
      data: updatedProduct,
    });
  });

  it("should delete a product", async () => {
    const deletedProduct: any = {
      name: "Deleted Product",
      price: 100,
      stock: 0,
      category: "A",
      image: "",
      description: "",
    };

    mockRequest.params = { id: "1" };
    adminService.deleteProduct.mockResolvedValue(deletedProduct);

    await adminController.deleteProduct(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Delete product successfully",
      status: 200,
      data: deletedProduct,
    });
  });

  it("should apply a discount to a product", async () => {
    mockRequest.body = { product_id: 1, discountPercentage: 10 };
    adminService.applyDiscount.mockResolvedValue({
      productId: 1,
      discount_id: 123,
      discount_percentage: 10,
      start_date: new Date(),
      end_date: new Date(),
    });

    await adminController.applyDiscount(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Discount applied successfully",
      status: 201,
    });
  });
});
