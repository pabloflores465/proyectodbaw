#!/bin/bash

# Cambiar a la rama main y asegurarse de que está actualizada
git checkout main
git pull origin main

# Iterar sobre cada rama local, excluyendo la rama main
for branch in $(git branch | grep -v 'main' | sed 's/*//'); do
  # Hacer merge de la rama en main
  echo "Haciendo merge de la rama: $branch en main"
  git merge $branch
  
  # Verificar si hubo conflictos
  if [ $? -ne 0 ]; then
    echo "Conflictos encontrados al hacer merge de $branch. Resuélvelos y luego continúa."
    exit 1
  fi
done

# Hacer push de la rama main a la remota
echo "Haciendo push de la rama main a la remota"
git push origin main


