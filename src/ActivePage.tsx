import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Board from './components/Board';
import Chat from './components/Chat';

const Post=(props: RouteComponentProps<{postId : string}>)=>{
  function update(){
    const nextP= +props.match.params.postId+1;
    props.history.push(`/posts/${nextP}`);
 }

  return(
    <div>

    <h3>Post {props.match.params.postId}</h3>
    <button onClick={update}>1증가해보자</button>
  </div>
  );

};
const PostList=(props: RouteComponentProps<{}>) => {
  return(
    <div>
    <h3>postList입니다</h3>

    <Route exact={true} path={`${props.match.url}`} component={Board}/>
    <Route path={`${props.match.url}/:postId`} component={Post}/>
<p>{new URLSearchParams(props.location.search).get('body')}</p>
  </div>
  );
};
const NotFound= ()=>{
  return(
    <h1>이것은 404</h1>
  );
};
const Admin = ()=>{
  const isAdmin = false;
  return isAdmin
  ? <h3>Admin입니다</h3>
  : <Redirect to ="/"/>;

};

class ActivePage extends React.Component{
  public render(){
    return(
      <div>

        <Switch>
        <Route exact={true} path="/" component={Board}/>
        <Route exact={true} path="/chat" component={Chat}/>
        {/* <Route path="/posts/:postId" component={Post}/> */}
        <Route path="/posts" component={PostList}/>
        <Route path="/admin" component={Admin}/>
        <Route component={NotFound}/>
      </Switch>

    </div>


    );

  }
}
export default ActivePage;
