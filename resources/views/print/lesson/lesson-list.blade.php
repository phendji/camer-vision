@extends('layouts.basic-layout')

@section('content')
    <table class="table table-sm">
        <thead class="thead-default">
            <tr>
                <th>@lang('print.student')</th>
                <th>@lang('print.phone')</th>
                <th>@lang('print.date_hour')</th>
                <th>@lang('print.instructor')</th>
                <th>@lang('print.status')</th>
            </tr>
        </thead>
        @foreach ($lessons as $lesson)
            <tr class="row {{$lesson->driving_lesson_billing_id ? 'table-success' : 'table-danger'}}">
                <td class="row">{{ $lesson->drivingStudent->user->firstname}} {{ $lesson->drivingStudent->user->lastname}}</td>
                <td class="row">
                    @if ($lesson->drivingStudent->user->phone[0])
                        {{ $lesson->drivingStudent->user->phone[0]->value }}
                    @endif
                </td>
                <td class="row">
                    <div class="col">
                        {{ucfirst(Carbon\Carbon::parse($lesson->start_date)->formatLocalized('%A %e %B'))}}
                    </div>
                    <div class="col">
                        {{ucfirst(Carbon\Carbon::parse($lesson->start_date)->formatLocalized('%Hh%M'))}}
                        {{ucfirst(Carbon\Carbon::parse($lesson->end_date)->formatLocalized(' à %Hh%M')) }}
                    </div>
                </td>
                <td class="row">
                    @if ($lesson->drivingInstructor)
                        {{ $lesson->drivingInstructor->user->firstname }}
                    @endif
                </td>
                <td class="row">
                    @if ($lesson->driving_lesson_billing_id)
                        @lang('print.payed')
                    @else
                        @lang('print.unpayed')
                    @endif
                </td>
            </tr>
        @endforeach
    </table>
@endsection