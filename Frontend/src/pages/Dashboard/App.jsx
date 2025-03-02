
import './App.css'

function App() {

  return (
    <>

      <div className='container'>

        <div className='room-members'> {/* contains members, room ID and leave button */}
          <h1> Squad </h1>
          <div>                       {/* TO DO: add status, make a function to display players */}
            <h2> player 1 </h2>
            <h2> player 2 </h2>
            <h2> player 3 </h2>
          </div>

          <div className='room-detail'> {/* contains room ID and leave button */}
            <h3> Room ID: room-code-id</h3>
            <button className='leave-button'> Leave </button>
          </div>
            
        </div>
        <div className='compiler-setup'> {/* TO DO: add compiler using api and style it */}
          <h1> code compiler</h1>
        </div>
      </div>
    </>
  )
}

export default App
