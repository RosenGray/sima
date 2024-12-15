'use server';

export const formActionHandler = async (formData:FormData) => {
    const image = formData.get('image') as File;
    console.log(image)
    // handleImageExample(image);
  }
