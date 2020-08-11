import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import Alert from '../Layout/Alert';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return (
    <section className='container'>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <Link to='/posts' className='btn'>
            Back to Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, { getPost })(Post);
