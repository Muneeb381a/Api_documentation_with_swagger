import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Documentation with swagger",
      description: "API endpoints documented on swagger",
      contact: {
        name: "Hafiz Muneeb",
        email: "muneebafzal381a@gmail.com",
        url: "https://github.com/Muneeb381a/Api_documentation_with_swagger",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/",
        description: "server",
      },
      {
        url: "<your live url here>",
        description: "Live server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./router/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
