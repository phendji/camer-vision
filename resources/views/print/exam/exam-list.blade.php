@extends('layouts.basic-layout')

@section('content')
    <table class="table">
        <thead class="thead-default">
            <tr>
                <th>@lang('print.student')</th>
                <th>@lang('print.phone')</th>
                <th>@lang('print.date_hour')</th>
                <th>@lang('print.where')</th>
                <th>@lang('print.instructor')</th>
            </tr>
        </thead>
        @foreach ($exams as $exam)
            <tr>
                <td>{{ $exam->drivingStudent->user->firstname}} {{ $exam->drivingStudent->user->lastname}}</td>
                <td>
                    @if ($exam->drivingStudent->user->phone[0])
                        {{ $exam->drivingStudent->user->phone[0]->value }}
                    @endif
                </td>
                <td>{{ucfirst(Carbon\Carbon::parse($exam->exam_date)->formatLocalized('%A %e %b à %Hh%M')) }}</td>
                <td>
                    @if ($exam->drivingExamPlace)
                        {{ $exam->drivingExamPlace->name }}, {{ $exam->drivingExamPlace->city }} {{ $exam->drivingExamPlace->zip_code }}
                    @endif
                </td>
                <td>
                    @if ($exam->drivingInstructor)
                        {{ $exam->drivingInstructor->user->firstname }}
                    @endif
                </td>
            </tr>
        @endforeach
    </table>
@endsection