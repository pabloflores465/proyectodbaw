#!/bin/bash

# Fetch todas las ramas remotas
git fetch --all

# Listar todas las ramas remotas y filtrar las que no existen localmente
for remote_branch in $(git branch -r | grep -v '\->' | grep -v 'origin/HEAD'); do
    # Obtener el nombre de la rama sin el prefijo "origin/"
    branch_name=$(echo $remote_branch | sed 's/origin\///')

    # Verificar si la rama ya existe localmente
    if ! git show-ref --verify --quiet refs/heads/$branch_name; then
        echo "Creando rama local: $branch_name desde $remote_branch"
        git checkout -b $branch_name $remote_branch
    else
        echo "La rama local '$branch_name' ya existe, omitiendo..."
    fi
done

