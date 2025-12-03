import os

base_path = os.getcwd()

structure = {
    "backend": {
        "src": {
            "config": ["db.js", "env.js"],
            "modules": {
                "users": ["user.model.js", "user.controller.js", "user.routes.js", "user.service.js"],
                "books": ["book.model.js", "book.controller.js", "book.routes.js", "book.service.js"],
                "uploads": ["upload.controller.js", "upload.routes.js"]
            },
            "middlewares": ["auth.js", "validate.js"],
            "utils": ["response.js", "error.js"],
            "": ["app.js", "server.js"]
        }
    },
    "frontend": {
        "src": {
            "components": [],
            "layout": ["DashboardLayout.jsx", "AuthLayout.jsx"],
            "modules": {
                "auth": ["Login.jsx", "Register.jsx", "useAuth.js"],
                "books": ["ListBooks.jsx", "CreateBook.jsx", "EditBook.jsx", "BookService.js"],
                "users": ["ListUsers.jsx", "EditUser.jsx"]
            },
            "hooks": ["useFetch.js", "useForm.js"],
            "context": ["AuthContext.jsx"],
            "": ["router.jsx", "main.jsx"]
        }
    }
}

def create_structure(base, struct):
    for key, value in struct.items():
        dir_path = os.path.join(base, key) if key else base
        os.makedirs(dir_path, exist_ok=True)

        if isinstance(value, list):
            for file in value:
                file_path = os.path.join(dir_path, file)
                if not os.path.exists(file_path):
                    with open(file_path, 'w') as f:
                        f.write('')
        elif isinstance(value, dict):
            create_structure(dir_path, value)

if __name__ == "__main__":
    create_structure(base_path, structure)
    print("Estructura backend + frontend creada correctamente!")
