package core

type PostcodesioError struct {
	IsPostcodesioError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPostcodesioError(code string, msg string, ctx *Context) *PostcodesioError {
	return &PostcodesioError{
		IsPostcodesioError: true,
		Sdk:              "Postcodesio",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PostcodesioError) Error() string {
	return e.Msg
}
