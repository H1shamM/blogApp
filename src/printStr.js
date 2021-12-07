printstr(s,r,w)
{
    var fullstring = s.repeat(r);
    for (var i = 0; i < fullstring.length; i++) 
    {
        if( i % w)
        {
            fullstring = fullstring.slice(0, i) + "/n" + fullstring.slice(i);
        }
      }
    console.log(fullstring);  
};