import {NextResponse} from 'next/server'
import {writeFile} from 'fs/promises'
import path from 'path'
import {v2 as cloudinary} from 'cloudinary';

   

//Se debe hacer en variables de entorno cuando esta en produccion
cloudinary.config({ 
  cloud_name: 'dtxxjaury', 
  api_key: '633798162672871', 
  api_secret: 'tar-hHD5jZEMm18j0K1MgWbh5co' 
});
export async function POST(request){
    const data=await request.formData();
    const image=data.get("image");
 
    if(!image){
        return NextResponse.json("No se ha subido ninguna imagen",{
            status:400
        });
    }


    const bytes=await image.arrayBuffer();
    const buffer=Buffer.from(bytes);

    //que teclado uso para comentar una porcion de codigo aqui?

    //const filePath=path.join(process.cwd(),'public',image.name);
    //await writeFile(filePath,buffer)
    
    const response =await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({},(err,result)=>{
            if(err){
                reject(err);
            }

            resolve(result);
        })
        .end(buffer);
    });

    console.log(response)

    return NextResponse.json({
        message:"imagen subida",
        url: response.secure_url
    });
}