def increment_ver(version):
    version = version.split('.')
    version[2] = str(int(version[2]) + 1)
    return '.'.join(version)

ver_file = "src/version.ts"

with open(ver_file, 'r') as file:
  filedata = file.read()

version = filedata[filedata.find("=")+3:-1]
string = filedata[0:filedata.find("= ")+3]
print(f'Old verison is {version}')
version = increment_ver(version)
print(f'New version is {version}')

with open(ver_file, 'w') as file:
  file.write(string + version + "\"")
  
