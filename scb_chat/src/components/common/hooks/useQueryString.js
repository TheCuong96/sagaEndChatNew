import { useState, useCallback } from "react";
import qs from "query-string";

export const getQueryStringValue = (
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    return values;
};

const setQueryStringWithoutPageReload = qsValue => {
    const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        qsValue;
    window.history.pushState({ path: newurl }, "", newurl);
};

const setQueryStringValue = (obj) => {
    const newQsValue = qs.stringify(obj);
    setQueryStringWithoutPageReload(`?${newQsValue}`);
}

function useQueryString(initialValue) {
    const [query, setQueryObj] = useState(getQueryStringValue() || initialValue);
    const setQuery = useCallback(
        newObjValue => {
            setQueryObj(newObjValue);
            setQueryStringValue(newObjValue);
        },
        []
    );

    return [query, setQuery];
}

export default useQueryString;
