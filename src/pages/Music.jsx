import { useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchLibraryPlaylists,
  fetchLikedPlaylist,
  fetchTop40,
  fetchTrendingHipHop,
  fetchTrendingRock
} from '../utils/wavlake';
import { PlaylistSection } from '../components/PlaylistSection';
<<<<<<< HEAD
import { AudioPlayer } from '../components/AudioPlayer';

export function Music() {
  const hasMounted = useRef(false);
=======
import { MusicPlayer } from '../components/MusicPlayer';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export function Music() {
  const hasMounted = useRef(false);
  const { loadPlaylist, currentTrack } = useAudioPlayer();
>>>>>>> Simple-updates

  const [pubkey, setPubkey] = useState(null);

  const [top40, setTop40] = useState();
  const [trendingRockPlaylist, setTrendingRockPlaylist] = useState();
  const [trendingHipHopPlaylist, setTrendingHipHopPlaylist] = useState();

  const [libraryPlaylists, setLibraryPlaylists] = useState();
  const [likedPlaylist, setLikedPlaylist] = useState();

<<<<<<< HEAD
  const [selectedPlaylistId, setSelectedPlaylistId] = useState();

=======
>>>>>>> Simple-updates
  useEffect(() => {
    window.nostr
      .getPublicKey()
      .then((pk) => {
        setPubkey(pk);
      })
      .catch((err) => {
        console.error(err);
      });

    const handleAuthEvent = (event) => {
      if (event.detail.type === 'login') {
        setPubkey(event.detail.pubkey);
      }

      if (event.detail.type === 'logout') {
        setPubkey(null);
      }
    };

    document.addEventListener('nlAuth', handleAuthEvent);

    return () => {
      document.removeEventListener('nlAuth', handleAuthEvent);
    };
  }, []);

  useEffect(() => {
    if (hasMounted.current) return;

    hasMounted.current = true;

    fetchTop40()
      .then((playlist) => {
        setTop40(playlist);
      })
      .catch((err) => {
        console.error('top40 error: ', err);
      });

    fetchTrendingRock()
      .then((playlist) => {
        setTrendingRockPlaylist(playlist);
      })
      .catch((err) => {
        console.error('trending rock error: ', err);
      });

    fetchTrendingHipHop()
      .then((playlist) => {
        setTrendingHipHopPlaylist(playlist);
      })
      .catch((err) => {
        console.error('trending hiphop error: ', err);
      });
  }, []);

  useEffect(() => {
    if (pubkey) {
      fetchLibraryPlaylists(pubkey)
        .then((playlists) => {
          setLibraryPlaylists(playlists);
          console.log('library playlists :>> ', playlists);
        })
        .catch((err) => {
          console.error('error fetching library playlists', err);
        });

      fetchLikedPlaylist()
        .then((playlist) => {
          setLikedPlaylist(playlist);
        })
        .catch((err) => {
          console.error('error fetching liked playlists', err);
        });
    } else {
      setLibraryPlaylists();
      setLikedPlaylist();
    }
  }, [pubkey]);

  const handleSelectPlaylist = (playlistId) => {
<<<<<<< HEAD
    setSelectedPlaylistId(playlistId);
=======
    loadPlaylist(playlistId);
>>>>>>> Simple-updates
  };

  const trendingPlaylists = useMemo(
    () =>
      [top40, trendingRockPlaylist, trendingHipHopPlaylist].filter(
        (pl) => pl !== undefined
      ),
    [top40, trendingRockPlaylist, trendingHipHopPlaylist]
  );

  const userPlaylists = useMemo(() => {
    const playlists = [];
    if (likedPlaylist) playlists.push(likedPlaylist);
    if (libraryPlaylists) playlists.push(...libraryPlaylists);

    return playlists;
  }, [libraryPlaylists, likedPlaylist]);

  return (
    <div className="container text-center py-12">
<<<<<<< HEAD
      <h1 className="text-2xl font-bold mb-4">Music</h1>
      <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
        {selectedPlaylistId && <AudioPlayer playlistId={selectedPlaylistId} />}
=======
      <h1 className="text-2xl font-bold mb-4">WAVLAKE</h1>
      <div className="bg-gray-100 rounded-lg p-4 sm:p-8 w-full max-w-lg mx-auto">
        {currentTrack && <MusicPlayer />}
>>>>>>> Simple-updates

        <PlaylistSection
          title="Trending"
          playlists={trendingPlaylists}
          handlePlaylistClick={handleSelectPlaylist}
        />
        <PlaylistSection
          title="Library"
          playlists={userPlaylists}
          handlePlaylistClick={handleSelectPlaylist}
        />
      </div>
    </div>
  );
}
