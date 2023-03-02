compositions=$(npx remotion compositions src/index.tsx -q)

for composition in $compositions
do
  npx remotion render src/index.tsx $composition out/$composition.mp4 --concurrency=1
done