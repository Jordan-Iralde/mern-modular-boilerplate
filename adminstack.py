import os
import shutil
import argparse

TEMPLATE_ROOT = r"C:\Users\yo\Documents\GitHub\mern-modular-boilerplate\AdminStack_Boilerplate"

def copy_tree(src, dst):
    if not os.path.exists(src):
        print(f"[SKIP] {src} no existe.")
        return
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    print(f"[OK] {src} -> {dst}")

def clone_boilerplate(target_root):
    copy_tree(os.path.join(TEMPLATE_ROOT, "backend"), os.path.join(target_root, "backend"))
    copy_tree(os.path.join(TEMPLATE_ROOT, "client"), os.path.join(target_root, "client"))
    print("Listo.")

def main():
    parser = argparse.ArgumentParser(prog="adminstack", description="CLI para clonar boilerplate.")
    sub = parser.add_subparsers(dest="command")

    new_cmd = sub.add_parser("new", help="Crear un nuevo proyecto")
    new_cmd.add_argument("path", help="Ruta destino del proyecto")

    args = parser.parse_args()

    if args.command == "new":
        clone_boilerplate(args.path)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
