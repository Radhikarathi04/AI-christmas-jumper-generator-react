import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import background_image from '../assets/background.jpg';

const ImageGenerator = () => {

    const[imageURL, setImageURL ] =useState('/');
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if(inputRef.current.value===''){
            return 0;
        }
        const response = await fetch(
            "https://stablediffusionapi.com/api/v3/text2img",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    "key": "gSEuhSXPegV8KdNx9vy3qJjQYAXSeHwrJIdEGaIo6KJXvCp90xuG6yvT68Pt",
                    "prompt": `${inputRef.current.value}`,
                    "negative_prompt": null,
                    "width": "512",
                    "height": "512",
                    "samples": "1",
                    "num_inference_steps": "20",
                    "safety_checker": "no",
                    "enhance_prompt": "yes",
                    "seed": null,
                    "guidance_scale": 7.5,
                    "multi_lingual": "no",
                    "panorama": "no",
                    "self_attention": "no",
                    "upscale": "no",
                    "embeddings_model": null,
                    "webhook": null,
                    "track_id": null
                    }),
            }
        );
        let data = await response.json();
        setImageURL(data.output[0]);
        // console.log(data);
    }

  return (
    <div className='ai-image-generator'>
        <div className='header'>Merry Knit-mas: Design your <span>Christmas Jumper🎄</span></div>
        <div className='img-loading'>
            <div className='image'><img src={imageURL==='/'?background_image:imageURL} alt=''/></div>
        </div>
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-input' placeholder='Jingle all the way with your words...'/>
        <div className='generate-btn' onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator;