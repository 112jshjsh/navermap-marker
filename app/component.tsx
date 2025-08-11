// app/component.tsx
"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

type Props= {
    language?: string;
    companyName?: string;
    companyAddress?: string;
    companyDetail?: string;
};

export default function NaverMap({ language, companyName, companyAddress, companyDetail }: Props) {
    useEffect(() => {
        const fetchNaverMapScript = async () => {
            try {
                // 3. 서버 API를 호출하여 안전하게 API 키를 가져옵니다.
                const response = await fetch('/api');
                if (!response.ok) {
                    throw new Error('Failed to fetch Naver Map API key');
                }
                const data = await response.json();
                const ncpKeyId = data.keyId; // 서버에서 받은 API 키

                // API 키를 포함하여 스크립트를 동적으로 생성합니다.
                const script = document.createElement("script");
                script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpKeyId}${language}`;
                script.async = true;
                script.onload = () => {
                    const initialLocation = new (window as any).naver.maps.LatLng(process.env.NEXT_PUBLIC_X_VALUE, process.env.NEXT_PUBLIC_Y_VALUE);

                    const mapOptions = {
                        center: initialLocation,
                        zoom: 16,
                        maxZoon: 22,
                        minZoom: 10,
                        zoomControl: true,
                        zoomControlOptions: {
                            position: (window as any).naver.maps.Position.TOP_LEFT,
                            style: (window as any).naver.maps.ZoomControlStyle.SMALL,
                        },
                        gl: true,
                        customStyleId: "4a331c05-5095-4b25-a1d9-8ae793e72b42",
                    };
        
                    const map = new (window as any).naver.maps.Map("map", mapOptions);
                    
                    const marker = new (window as any).naver.maps.Marker({
                        position: initialLocation,
                        map: map,
                        icon: {
                            url: '/marker_q.svg', // 마커 이미지 URL;
                            size: new (window as any).naver.maps.Size(30, 30),
                            origin: new (window as any).naver.maps.Point(0, 0),
                            anchor: new (window as any).naver.maps.Point(10, 26),
                        }
                    });
        
                    const resetBtn = document.getElementById("resetButton");
                    resetBtn?.addEventListener("click", () => {
                        map.setCenter(initialLocation);
                        map.setZoom(16); 
                    });
        
                    const infowindowtext = [
                        '<div style="padding:5px; text-align: center; color: black;">',
                        `   <p style="font-size: 14px; font-weight: bold; margin: 0;">${companyName}</p>`,
                        `   <p style="font-size: 11px; margin: 0;">${companyAddress}</p>`,
                        `   <p style="font-size: 11px; margin: 0;">${companyDetail}</p>`,
                        '</div>'
                    ].join('');
        
                    var infowindow = new (window as any).naver.maps.InfoWindow({
                        content: infowindowtext,
                        maxWidth: 200,
                        height: 50,
                        backgroundColor: "white",
                        borderColor: "black",
                        borderWidth: 1,
                        disableAnchor: true, 
                        textAlign: "center",
                        margin: "auto",
        
                        pixelOffset: new (window as any).naver.maps.Point(0, -5)
                    });
        
                    (window as any).naver.maps.Event.addListener(marker, "click", function() {
                        if (infowindow.getMap()) {
                            infowindow.close();
                        } else {
                            infowindow.open(map, marker);
                        }
                    });
        
                    infowindow.open(map, marker);
        
                };

                document.head.appendChild(script);

            } catch (error) {
                console.error(error);
            }
        };

        fetchNaverMapScript();
    }, [language, companyName, companyAddress, companyDetail]);

    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        {/* 지도 위치 초기화 버튼 */}
            <div
                id="resetButton"
                style={{
                    position: "absolute",
                    top: 75,
                    left: 10,
                    zIndex: 100,
                    backgroundColor: "white",
                    padding: "5px 5px",
                    border: "1px solid",
                    borderRadius: "1px",
                    cursor: "pointer",
                    // boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
                >
                <RotateCcw size={18} color="#707070ff" strokeWidth={3}/>
            </div>
            
            {/* 지도 표시 */}
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
}