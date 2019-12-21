import React from 'react';

const Button = ({ onClick, title, loading }) => {
   if (loading) {
      return (
         <button className="btn btn-secondary btn-user btn-block" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-disabled="true"></span>
            Loading...
       </button>
      )
   }
   return (
      <button type="submit" onClick={onClick}
         className="btn btn-primary btn-user btn-block"> {title} </button>
   )
}

export default Button;