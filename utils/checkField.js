const missingField = (requiredFields,body)=>{
    const missingFields = requiredFields.filter((field) => !body[field]);
    if(missingFields.length > 0){
      return {
        status:true,
        message:`Please provide all required fields: ${missingFields.join(', ')}`
      }
    }else{
      return {
        status:false,
        message:''
      }
    }
  };
export default missingField;