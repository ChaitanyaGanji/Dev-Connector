import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Alert from '../Layout/Alert';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <section className='container'>
      <Alert />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i>
            Welcome to the community
          </p>
          <PostForm />
          <div className='post-form'>
            {posts.map((post) => {
              return <PostItem key={post._id} post={post} />;
            })}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func,
  post: PropTypes.object,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
