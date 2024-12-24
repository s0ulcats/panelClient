import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './SteamPanelPage.module.scss';
import axios from 'axios';

export const SteamPanelPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '',
    ava: '',
    decor: '',
    bg_img: '',
    bg_webm: '',
    bg_mp4: '',
  });

  const [tokenLink, setTokenLink] = useState('');
  const username = useSelector((state) => state.auth.user?.username);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      alert('User is not logged in!');
      return;
    }

    try {
      const response = await axios.post('http://145.223.23.122:80/api/steam', {
        ...formData,
        username,
      });

      console.log('Data saved:', response.data);

      setFormData({
        name: '',
        description: '',
        level: '',
        ava: '',
        decor: '',
        bg_img: '',
        bg_webm: '',
        bg_mp4: '',
      });

      setTokenLink(response.data.link);

      setTimeout(() => {
        setTokenLink('');
      }, 30000);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to send the form.');
    }
  };

  return (
    <div className={s.steamPanel}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

<div className={s.formGroup}>
  <input
    type="number"
    id="level"
    name="level"
    placeholder="Level"
    value={formData.level}
    onChange={handleChange}
    required
  />
</div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="ava"
            name="ava"
            placeholder="Avatar"
            value={formData.ava}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="decor"
            name="decor"
            placeholder="Decor"
            value={formData.decor}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="bg_img"
            name="bg_img"
            placeholder="Background Image URL"
            value={formData.bg_img}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="bg_webm"
            name="bg_webm"
            placeholder="Background WebM URL"
            value={formData.bg_webm}
            onChange={handleChange}
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            id="bg_mp4"
            name="bg_mp4"
            placeholder="Background MP4 URL"
            value={formData.bg_mp4}
            onChange={handleChange}
          />
        </div>

        <div className={s.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>

      {tokenLink && (
        <div className={s.tokenLink}>
          <a href={tokenLink}>{tokenLink}</a>
        </div>
      )}
    </div>
  );
};
