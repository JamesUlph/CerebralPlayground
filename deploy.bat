set NODE_ENV=production
call npm run build
call node server
set NODE_ENV=