
import React from 'react'
import { FaUser } from "react-icons/fa";
import './App.css';

const Second = ({username,messages}) => {
  return (

    <>
      

    <div className='second-main-container'> 
           
     <div style={{display:"flex", justifyContent:"flex-start"}}>
        
         <div className='second-container'>

                 
                 <FaUser  className='user-profile'/>  
                  
                  

         </div>

         <div className='userName-container'>    

                       <h4>{username}</h4>

                       <p>Available</p>    
         </div>

    </div>

    <div className='second-container-2'>

                    
            <div className='all'>

                 <p>All</p>

            </div>

            <div className='personal'>

                  <p>Personal</p>

           </div>

           <div className='group' >

                 <p>Groups</p>

           </div>

             
    
     </div> <br/>

     {messages.map((msg, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
          >
            <div style={{ display: "flex", }}>
              <div className="second-container-1">
                <img
                  className="profile-img"
                  src={`https://picsum.photos/seed/${msg.user}/50`}
                  alt={`${msg.user}'s avatar`}
                />
              </div>
              <div className="userName-container">
                <h4 style={{float:'left'}}>{msg.user}</h4>
                <p>{msg.message}</p>
              </div>
            </div>
            <div>
              <div className="UserSeen">
                <span>9.12 AM</span>
              </div>
            </div>
          </div>
        ))}

    <div style={{display:"flex", justifyContent:"space-between"}}>

     
<div style={{display:"flex"}}>
       
       <div className='second-container-1'>

               
       <img className='profile-img' src="https://picsum.photos/300/302" alt="Random" />
                
                

       </div>

       <div className='userName-container'>

                     <h4>Logeshwaran</h4>

                     <p>How are you doing?</p>
  
       </div>
</div>

  <div>

         <div className='UserSeen'>
             
               <span>9.12 AM</span>

           </div>

    </div>

   </div>

   <div style={{display:"flex", justifyContent:"space-between"}}>

     
 <div style={{display:"flex"}}>
        
        <div className='second-container-1'>

             
               <img className='profile-img' src="https://picsum.photos/300/303" alt="Random" />
                 
                 

        </div>

        <div className='userName-container'>

                      <h4>Logeshwaran</h4>

                      <p>How are you doing?</p>
   
        </div>
</div>

   <div>

          <div className='UserSeen'>
              
                <span>9.12 AM</span>

            </div>

     </div>

    </div>

    <div style={{display:"flex", justifyContent:"space-between"}}>

     
 <div style={{display:"flex"}}>
        
        <div className='second-container-1'>

                
                  <img className='profile-img' src="https://picsum.photos/300/304" alt="Random" />
                 
                 

        </div>

        <div className='userName-container'>

                      <h4>Logeshwaran</h4>

                      <p>How are you doing?</p>
   
        </div>
</div>

   <div>

          <div className='UserSeen'>
              
                <span>9.12 AM</span>

            </div>

     </div>

    </div>

    <div style={{display:"flex", justifyContent:"space-between"}}>

     
 <div style={{display:"flex"}}>
        
        <div className='second-container-1'>

                
                 <img className='profile-img' src="https://picsum.photos/300/305" alt="Random" />
                 
                 

        </div>

        <div className='userName-container'>

                      <h4>Logeshwaran</h4>

                      <p>How are you doing?</p>
   
        </div>
</div>

   <div>

          <div className='UserSeen'>
              
                <span>9.12 AM</span>

            </div>

     </div>

    </div>

    <div style={{display:"flex", justifyContent:"space-between"}}>

     
 <div style={{display:"flex"}}>
        
        <div className='second-container-1'>

                
                  <img className='profile-img' src="https://picsum.photos/300/306" alt="Random" />
                 
                 

        </div>

        <div className='userName-container'>

                      <h4>Logeshwaran</h4>

                      <p>How are you doing?</p>
   
        </div>
</div>

   <div>

          <div className='UserSeen'>
              
                <span>9.12 AM</span>

            </div>

     </div>

    </div>

    <div style={{display:"flex", justifyContent:"space-between"}}>

     
 <div style={{display:"flex"}}>
        
        <div className='second-container-1'>

                
                     <img className='profile-img' src="https://picsum.photos/300/307" alt="Random" />
                 
                 

        </div>

        <div className='userName-container'>

                      <h4>Logeshwaran</h4>

                      <p>How are you doing?</p>
   
        </div>
</div>

   <div>

          <div className='UserSeen'>
              
                <span>9.12 AM</span>

            </div>

     </div>

    </div>
     

 </div>
    
  </>
  )
}

export default Second; 