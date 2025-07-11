"use client";

import { useEffect } from "react";

type Props= {
    height?: number;
};

export default function NaverMap({ height }: Props) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`;
        script.async = true;
        script.onload = () => {
            const initialLocation = new (window as any).naver.maps.LatLng(process.env.NEXT_PUBLIC_X_VALUE, process.env.NEXT_PUBLIC_Y_VALUE);

            const mapOptions = {
                center: initialLocation,
                zoom: 16,
                zoomControl: true,
                zoomControlOptions: {
                position: (window as any).naver.maps.Position.TOP_RIGHT,
                style: (window as any).naver.maps.ZoomControlStyle.SMALL,
                },
            };

            const map = new (window as any).naver.maps.Map("map", mapOptions);
            
            const marker = new (window as any).naver.maps.Marker({
                position: initialLocation,
                map: map,
            });

            const resetBtn = document.getElementById("resetButton");
            resetBtn?.addEventListener("click", () => {
                map.setCenter(initialLocation);
                map.setZoom(16);
            });

            const infowindowtext = [
                '<div style="padding:5px; text-align: center; ">',
                `   <p style="font-size: 14px; font-weight: bold; margin: 0;">${process.env.NEXT_PUBLIC_LOCATION_NAME}</p>`,
                `   <p style="font-size: 11px; margin: 0;">${process.env.NEXT_PUBLIC_LOCATION_ADDRESS}</p>`,
                `   <p style="font-size: 11px; margin: 0;">${process.env.NEXT_PUBLIC_LOCATION_DETAIL}</p>`,
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
                textColor: "black",
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

        };

    document.head.appendChild(script);
    }, []);

    return (
        <div>
        {/* 위치 초기화 버튼 */}
        <div
            id="resetButton"
            style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 100,
                backgroundColor: "white",
                padding: "8px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
            >
            🔄
        </div>
        
        {/* 지도 표시 */}
        <div id="map" style={{ width: "100%", height: `${height}px` }}></div>
        </div>
    );
}
