import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <section className='container'>
      <div className='post-form'>
        <div className='post-form-header bg-primary'>
          <h3>Say Something...</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText('');
          }}
        >
          <textarea
            cols='30'
            rows='5'
            placeholder='Create a Post'
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type='submit' value='submit' className='btn btn-dark my-1' />
        </form>
      </div>
    </section>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func,
};

export default connect(null, { addPost })(PostForm);
