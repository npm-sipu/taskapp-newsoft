import { useEffect, useState } from "react";
import Image from "next/image";

interface IFilterInputBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}

export function FilterInputBox(props: IFilterInputBoxProps) {
  const { value: initialValue, onChange, debounce, ...rest } = props;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce || 100);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <div className=' flex relative shadow-sm rounded-sm max-w-[450px]  w-full justify-between  border  border-[#BCC8DB] '>
      <input
        onChange={(e) => setValue(e.target.value)}
        {...rest}
        type='search'
        name={`search_${Math.random().toString(36).substr(2, 9)}`}
        id='search'
        autoComplete='off'
        className='lg:w-full rounded-sm sm:w-52 border-0 py-2 pl-4 text-base text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
      />

      <button type='button' className='bg-white px-4'>
        <Image
          width={30}
          height={30}
          alt='search'
          src='/formIcons/search.svg'
        />
      </button>
    </div>
  );
}
