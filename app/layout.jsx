import '@styles/global.css'
import Nav from '@components/nav'
import Provider from '@components/Provider'

export const metadata = {
    title:"Prompt it",
    description:"Discover & Share AI Prompts"
}


function Rootlayout({children}) {
  return (
    <html lang='en'>
        <body >
          <Provider>
           <div className='main'>
              <div className='gradient' /> 
           </div>

           <main className='app'>
            <Nav/>
            {children}
           </main>
          </Provider>
        </body>
    </html>

  )
}

export default Rootlayout