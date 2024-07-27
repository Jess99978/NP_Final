import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/speaker/speaker-detail.module.scss";
import SpeakerCardHorizontal from "@/components/speaker/speaker-detail/SpeakerCardHorizontal";
import SpeakerProfileSection from "@/components/speaker/speaker-detail/SpeakerProfileSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import LectureCardVertical from "@/components/speaker/speaker-detail/LectureCardVertical";

export default function SpeakerDetail() {
  const [speaker, setSpeaker] = useState({
    speaker_id: "",
    speaker_name: "",
    speaker_title: "",
    speaker_description: "",
    speaker_experience: "",
    speaker_license: "",
    speaker_image: "",
    valid: 1,
  });
  // 所有講師的資料
  const [speakers, setSpeakers] = useState([]);
  // 過濾後的講師數據
  const [filteredSpeakers, setFilteredSpeakers] = useState([]);
  //講師開設的課程資訊
  const [relatedClass, setRelatedClass] = useState([
    {
      class__i_d: "",
      class_name: "",
      class_description: "",
      image__u_r_l: "",
    },
  ]);
  // 宣告出 router 物件，可以取得兩個值
  // 1. router.query，是一個物件，其中有動態路由的參數值pid
  // 2. router.isReady，是一個布林值，代表本頁面元件已完成水合作用，可以得到pid值
  const router = useRouter();
  const getSpeakers = async (sid) => {
    try {
      const url = `http://localhost:3005/api/speakers/${sid}`
      const res = await fetch(url);
      if(!res.ok) throw new Error(`找不到資料 ${res.status}`)
      const data = await res.json();
      if (data.status === "success") {
        // 檢查回傳講師資料是否為物件
        if (typeof data.data.speaker === "object") {
          setSpeaker(data.data.speaker);
        }
        if (Array.isArray(data.data.speakers)) {
          setSpeakers(data.data.speakers);
        }
        if (Array.isArray(data.data.ClassData)) {
          setRelatedClass(data.data.ClassData);
        }
      }
    }catch (err){
      console.error(err.message);
    }
  }

  // 將 speakers 篩選出推薦講師的資料來源 filterSpeakers （也是一個陣列）
  // 規則：當頁講師 id 的後五筆資料，若是排序最後五筆的講師，側邊推薦講師都顯示最後五筆
  useEffect(() => {
    const id = Number(router.query.sid);
    let filterSpeakers;
    id < speakers.length - 4
      ? (filterSpeakers = speakers.slice(id, id + 5))
      : (filterSpeakers = speakers.slice(speakers.length - 5, speakers.length));
    setFilteredSpeakers(filterSpeakers);
  }, [speakers, router.query.sid]);

  // 頁面初次渲染後向伺服器要求資料
  // 監聽router.isReady，true 或是sid有變動時，都會重新向伺服器取得資料
  useEffect(() => {
    if (router.isReady) {
      getSpeakers(router.query.sid);
    }
  }, [router.isReady, router.query.sid]);

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={`${styles.navLeft} ${styles.boxShadow}`}>
          <h5>推薦講師</h5>
          <div className={styles.divider}></div>
          <div className={styles.speakerCardListGroup}>
           { filteredSpeakers.map(v => {
             return (<>
               <SpeakerCardHorizontal
                 key={v.speaker_id}
                 id={v.speaker_id}
                 name={v.speaker_name}
                 description={v.speaker_description}
                 image={v.speaker_image}
               />
             </>)
            })}
          </div>
        </div>
        <div className={styles.navRight}>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img
                src={`/speaker-image/${speaker.speaker_image}`}
                alt={speaker.speaker_name}
              />
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileName}>
                <h3>{speaker.speaker_name}</h3>
                <h5>{speaker.speaker_title}</h5>
              </div>
              <div className={styles.profileBody}>
                <SpeakerProfileSection
                  description={speaker.speaker_description}
                  experience={speaker.speaker_experience}
                  license={speaker.speaker_license}
                />
              </div>
            </div>
          </div>
          <div className={styles.upcomingLectures}>
            <p className={styles.title}>近期課程</p>
            <div className={styles.lectureGroup}>
              {relatedClass.map((v) => {
                return (
                  <LectureCardVertical
                    key={v.class__i_d}
                    name={v.class_name}
                    description={v.class_description}
                    image={v.image__u_r_l}
                    classID={v.class__i_d}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
