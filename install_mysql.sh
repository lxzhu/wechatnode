for file in mysql/*.sql
do 
echo exec scrip file: $file
mysql -uroot -pN0rikos123 wechat <$file

done