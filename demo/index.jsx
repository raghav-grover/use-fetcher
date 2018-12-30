import React from 'react';
import ReactDOM from 'react-dom';
import {useFetcher} from '../';

function GitHubUsers(props) {
    const { data: users, success, abort, error, timeTaken } = useFetcher(
      "https://api.github.com/users",
      [],
      {
        runWhenSpecificPropsChanges: [],//Leave this array empty, if you only want to run fetch on Mount
        returnRawFetchResponse: false
      }
    );
    //const { data, success } = useFetch("https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg");
    return users.map((user)=>{
        return (
            <div key={user.id}>
                <span>
                    {user.login} 
                    <a href={user.url}/>
                </span>
            </div>
        )
    })
  }

const rootElement = document.getElementById("root");
ReactDOM.render(<GitHubUsers />, rootElement);