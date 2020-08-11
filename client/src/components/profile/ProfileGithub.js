import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getGitHubRepos } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(username);
  }, [getGitHubRepos]);
  return (
    <div className='profile-github'>
      <h2 className='tex-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.name} className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li></li>
                {repo.stargazers && repo.stargazers.count && (
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers.count}
                  </li>
                )}
                {repo.watchers && repo.watchers.count && (
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers.count}
                  </li>
                )}
                {repo.forks && repo.forks.count && (
                  <li className='badge badge-light'>
                    Forks: {repo.forks.count}
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
