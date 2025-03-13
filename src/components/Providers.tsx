"use client";

import { getProviders } from "@/queries/queries";
import { FavouritesType, ProvidersType } from "@/types/common";
import { useEffect, useState } from "react";

const Providers = ({ id, type }: { id: string; type: FavouritesType }) => {
  const [providers, setProviders] = useState<ProvidersType>();
  const [country, setCountry] = useState("");
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  useEffect(() => {
    fetch("/api/geolocation")
      .then((res) => res.json())
      .then((data) => setCountry(data.country))
      .catch(console.error);
  }, []);

  const fetchProviders = async () => {
    const res = await getProviders(id, type);
    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const filteredProviders = providers
    ? Object.entries(providers).find(([key]) => key === country)
    : undefined;

  return (
    <div className="py-3 flex flex-col col-span-8">
      <div className="flex gap-3">
        <p className="font-bold">Providers</p>
        {!filteredProviders && <div>Not available</div>}
      </div>
      <div>
        {filteredProviders?.[1].buy &&
          filteredProviders?.[1].buy.length > 0 && (
            <div className="py-2">Buy</div>
          )}
        <div className="flex gap-2 flex-wrap">
          {filteredProviders?.[1].buy &&
            filteredProviders?.[1].buy.map((item) => (
              <img
                key={item.provider_name}
                className="size-20 rounded-lg"
                src={`${URL_IMAGE + item.logo_path}`}
                alt={item.provider_name}
              />
            ))}
        </div>
        {filteredProviders?.[1].flatrate &&
          filteredProviders?.[1].flatrate.length > 0 && (
            <div className="py-2">Stream</div>
          )}
        <div className="flex gap-2 flex-wrap">
          {filteredProviders?.[1].flatrate &&
            filteredProviders?.[1].flatrate.map((item) => (
              <img
                key={item.provider_name}
                className="size-20 rounded-lg"
                src={`${URL_IMAGE + item.logo_path}`}
                alt={item.provider_name}
              />
            ))}
        </div>
        {filteredProviders?.[1].rent &&
          filteredProviders?.[1].rent.length > 0 && (
            <div className="py-2">Rent</div>
          )}
        <div className="flex gap-2 flex-wrap">
          {filteredProviders?.[1].rent &&
            filteredProviders?.[1].rent.map((item) => (
              <img
                key={item.provider_name}
                className="size-20 rounded-lg"
                src={`${URL_IMAGE + item.logo_path}`}
                alt={item.provider_name}
              />
            ))}
        </div>
        {filteredProviders && (
          <div className="pt-6">
            <a
              className="hover:underline"
              href={filteredProviders?.[1].link}
              target="_blank"
            >
              See all providers
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;
