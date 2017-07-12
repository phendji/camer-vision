Bonjour {{$studentName}},
Je vous reconfirme notre rendez-vous de demain de @for($i = 0; $i < count($lessonsTimes); $i++){{$lessonsTimes[$i]}}@if(count($lessonsTimes) - 1 > $i) et de @endif @endfor.
À demain! Jonathan de Rouleasy - 0651467005